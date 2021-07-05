import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {SchoolService} from '../../service/SchoolClass.service';
import {LoadMoreFlatNode, LoadMoreNode, Section, Student, Type} from '../../entity/schoolClass';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {LoadMoreDatabase} from '../../service/loadMoreDatabase.service';
import {Observable, Subject} from 'rxjs';
import {LoaderService} from '../../service/loader.service';
import {ToasterService} from '../../service/toaster.service';

@Component({
  selector: 'app-school-class-list',
  templateUrl: './school-class.component.html',
  styleUrls: ['./school-class.component.scss']
})
export class SchoolClassComponent implements OnInit, OnChanges {

  // @ts-ignore
  @Input() updatedStudent: Student;

  @Output() student = new EventEmitter<Student>();

  isLoading$: Subject<boolean> = this.loader.isLoading;

  nodeMap = new Map<string, LoadMoreFlatNode>();
  // @ts-ignore

  public treeControl: FlatTreeControl<LoadMoreFlatNode>;

  // @ts-ignore
  treeFlattener: MatTreeFlattener<LoadMoreNode, LoadMoreFlatNode>;

  // @ts-ignore
  public dataSource: MatTreeFlatDataSource<LoadMoreNode, LoadMoreFlatNode>;

  constructor(private toaster: ToasterService, private schoolService: SchoolService, private service: LoadMoreDatabase, private loader: LoaderService) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );

    this.treeControl = new FlatTreeControl<LoadMoreFlatNode>(
      this.getLevel,
      this.isExpandable
    );

    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );

    service.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });

    service.initialize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['updatedStudent'].currentValue && this.nodeMap.has(changes['updatedStudent'].currentValue.id)) {
      const currentStudent: Student = changes['updatedStudent'].currentValue;
      const loadMoreNode = new LoadMoreNode(
        currentStudent,
        false
      );

      const loadMoreFlatNode = new LoadMoreFlatNode(
        currentStudent,
        2
      );

      this.service.nodeMap.set(changes['updatedStudent'].currentValue.id, loadMoreNode);
      this.nodeMap.set(changes['updatedStudent'].currentValue.id, loadMoreFlatNode);

      // @ts-ignore
      const currentNode = this.nodeMap.get(changes['updatedStudent'].currentValue.id).item;

      // @ts-ignore
      this.service.loadMore(currentNode.section, Type.Student, currentStudent.id, currentNode.class.toString());

    }
  }

  ngOnInit(): void {
  }

  showErrorToaster() {
    this.toaster.show('error', 'Something went Wrong');
  }

  getChildren = (node: LoadMoreNode): Observable<LoadMoreNode[]> =>
    node.childrenChange;

  transformer = (node: LoadMoreNode, level: number) => {
    const existingNode = this.nodeMap.get(node.item.id);

    if (existingNode) {
      return existingNode;
    }

    const newNode = new LoadMoreFlatNode(
      node.item,
      level,
      node.hasChildren
    );
    this.nodeMap.set(node.item.id, newNode);
    return newNode;
  };

  getLevel = (node: LoadMoreFlatNode) => node.level;

  isExpandable = (node: LoadMoreFlatNode) => {
    return node.expandable;
  };

  loadChildren(node: LoadMoreFlatNode) {

    if (node.level === 0) {
      this.getSections(node);
    } else if (node.level === 1) {
      this.getStudents(node);
    }

  }

  getStudents(node: LoadMoreFlatNode): void {
    const className = (<Section> node.item).className;
    const classId = +className;
    const tmp: Student[] = [];

    // @ts-ignore
    if (this.nodeMap.get(node.item.id)?.item.students.length > 0) {
      this.service.loadMore(node.item.name, Type.Student, node.item.id, className);
    } else {
      this.schoolService.getSortedStudents(classId, node.item.name).subscribe(students => {
        students.forEach(student => {
          tmp.push({...student, id: Math.random().toString()});
        });

        this.service.setStudentForSection(className, node.item.name, tmp);
        this.service.loadMore(node.item.name, Type.Student, node.item.id, className);

      }, (error) => {
        this.showErrorToaster();
      });
    }
  }

  getSections(node: LoadMoreFlatNode): void {
    const schoolClassName = node.item.name;

    // @ts-ignore
    if (this.nodeMap.get(node.item.id)?.item.sections.length > 0) {
      this.service.loadMore(schoolClassName, Type.Section, node.item.id);
    } else {
      this.schoolService.getSortedSections(schoolClassName).subscribe(sections => {
        const tmp: Section[] = [];
        sections.forEach(section => {
          const _section = {name: section, students: [], className: schoolClassName, id: Math.random().toString()};
          tmp.push(_section);
        });
        this.service.setSectionForClass(schoolClassName, tmp);
        this.service.loadMore(schoolClassName, Type.Section, node.item.id);
      }, (error) => {
        this.showErrorToaster();
      });
    }
  }

  openDrawer(node: any) {
    const currentStudent: Student = node.item;
    this.student.emit(currentStudent);
  }

}
