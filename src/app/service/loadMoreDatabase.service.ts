import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {LoadMoreNode, SchoolClass, Section, Student, Type} from '../entity/schoolClass';
import {SchoolService} from './SchoolClass.service';

const LOAD_MORE = 'LOAD_MORE';


@Injectable({
  providedIn: 'root'
})
export class LoadMoreDatabase {
  batchNumber = 5;
  dataChange = new BehaviorSubject<LoadMoreNode[]>([]);
  nodeMap = new Map<string, LoadMoreNode>();

  constructor(private schoolService: SchoolService) {
  }

  rootLevelNodes: string[] = [];
  dataMap = new Map<string, any[]>([]);
  classData: SchoolClass[] = [];

  initialize() {
    this.schoolService.getSortedClasses().subscribe(schoolClasses => {
      schoolClasses.forEach(schoolClass => {
        const scClass: SchoolClass = {name: schoolClass.toString(), sections: [], id: Math.random().toString()};
        this.classData.push(scClass);
        this.rootLevelNodes.push(scClass.name);
      });
      const data = this.classData.map(item => this._generateNode(item));
      this.dataChange.next(data);
    });
  }

  /** Expand a node whose children are not loaded */
  loadMore(item: string, childrenType: Type, id: string, className = '') {
    if (!this.nodeMap.has(id)) {
      return;
    }
    const parent = this.nodeMap.get(id)!;
    let children;

    if (childrenType === Type.Section) {
      const req_class = this.classData.find(value => value.name === item);
      if (!req_class) {
        return;
      }
      // @ts-ignore
      children = req_class.sections;
    } else {
      const req_class = this.classData.find(value => value.name === className);

      // @ts-ignore
      const req_section = req_class.find(value => value.name === item);

      children = req_section.students;
    }

    const newChildrenNumber = parent.children!.length + this.batchNumber;
    const nodes = children.slice(0, newChildrenNumber).map((value: Student | Section) => this._generateNode(value));
    // if (newChildrenNumber < children.length) {
    //   // Need a new load more node
    //   nodes.push(new LoadmoreNode(LOAD_MORE, false, item));
    // }

    parent.childrenChange.next(nodes);
    this.dataChange.next(this.dataChange.value);
  }

  private _generateNode(item: Student | Section | SchoolClass): LoadMoreNode {
    if (this.nodeMap.has(item.id)) {
      return this.nodeMap.get(item.id)!;
    }
    //const req_class = this.classData.find(value => value.name === item);
    const result = new LoadMoreNode(item, true);
    this.nodeMap.set(item.id, result);
    return result;
  }

  setSectionForClass(item: string, data: Section[]) {
    const req_class = this.classData.find(value => value.name === item);
    if (req_class) {
      req_class.sections = data;
    }
  }

  setStudentForSection(className: string, sectionName: string, data: Student[]) {
    const req_class = this.classData.find(value => value.name === className);
    if (req_class) {
      const req_Section = req_class.sections.find(section => section.name === sectionName);
      // @ts-ignore
      req_Section.students = data;
    }

  }
}
