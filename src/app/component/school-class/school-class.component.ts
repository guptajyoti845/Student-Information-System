import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {SchoolService} from '../../service/SchoolClass.service';
import {LoadMoreFlatNode, LoadMoreNode, SchoolClass, Section, Student, Type} from '../../entity/schoolClass';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {LoadMoreDatabase} from '../../service/loadMoreDatabase.service';
import {Observable, Subject} from 'rxjs';
import {LoaderService} from '../../service/loader.service';

@Component({
  selector: 'app-school-class-list',
  templateUrl: './school-class.component.html',
  styleUrls: ['./school-class.component.scss']
})
export class SchoolClassComponent implements OnInit, OnChanges {

  // @ts-ignore
  @Input() updatedStudent: Student;

  @Output() student = new EventEmitter<Student>();

  isLoading: Subject<boolean> = this.loader.isLoading;

  nodeMap = new Map<string, LoadMoreFlatNode>();
  // @ts-ignore

  public treeControl: FlatTreeControl<LoadMoreFlatNode>;

  // @ts-ignore
  treeFlattener: MatTreeFlattener<LoadMoreNode, LoadMoreFlatNode>;

  // @ts-ignore
  public dataSource: MatTreeFlatDataSource<LoadMoreNode, LoadMoreFlatNode>;

  schoolClasses: SchoolClass[] = [];

  constructor(private schoolService: SchoolService, private service: LoadMoreDatabase, private loader: LoaderService) {
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
      const node = new LoadMoreNode(
        currentStudent,
        false,
        null,
      );
      this.service.nodeMap.set(changes['updatedStudent'].currentValue.id, node);
    }
  }


  ngOnInit(): void {
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
      node.hasChildren,
      node.loadMoreParentItem
    );
    this.nodeMap.set(node.item.id, newNode);
    return newNode;
  };

  getLevel = (node: LoadMoreFlatNode) => node.level;

  isExpandable = (node: LoadMoreFlatNode) => {
    return node.expandable;
  };

  loadChildren(node: LoadMoreFlatNode) {
    console.log('load more children');
    console.log('node', node);
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
    this.schoolService.getSortedStudents(classId, node.item.name).subscribe(students => {
      students.forEach(student => {
        tmp.push({...student, id: Math.random().toString()});
      });

      this.service.setStudentForSection(className, node.item.name, tmp);
      this.service.loadMore(node.item.name, Type.Student, node.item.id, className);

    });
  }

  getSections(node: LoadMoreFlatNode): void {
    const schoolClassName = node.item.name;
    this.schoolService.getSortedSections(schoolClassName).subscribe(sections => {
      const tmp: Section[] = [];
      sections.forEach(section => {
        const _section = {name: section, students: [], className: schoolClassName, id: Math.random().toString()};
        tmp.push(_section);
      });
      this.service.setSectionForClass(schoolClassName, tmp);
      this.service.loadMore(schoolClassName, Type.Section, node.item.id);
    });

  }

  openDrawer(node: any) {
    const currentStudent: Student = node.item;
    this.student.emit(currentStudent);
  }
}
