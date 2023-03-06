export class Section {
  constructor(
    public id: any,
    public label: string,
    public questions: any,
  ){}
}

export class Question {
  constructor(
    public id: any,
    public sectionID: any,
    public label: string,
    public options: any,
    public type: any,
    public required: boolean,
    public enabled: boolean,
    public parentOf?: any,
    public childOf?: any,
    public choice?: any,
    public price?: number,
    public name?: string,
    public link?: string,
    public error?: boolean
  ) {
    this.id = id;
    this.sectionID = sectionID;
    this.label = label;
    this.options = options;
    this.type = type;
    this.required = required,
    this.enabled = enabled,
    this.parentOf = parentOf ? parentOf : undefined;
    this.childOf = childOf ? childOf : undefined;
    this.choice = choice ? choice : undefined;
    this.price = price ? price : undefined;
    this.name = name ? name : undefined;
    this.link = link ? choice : undefined;
    this.error = choice ? choice : true;
  }
}

export class InitQuestion {
  constructor(
    public section_id: any,
    public section_label: any,
    public label: string,
    public options: any,
    public type: any,
    public required: boolean,
    public enabled: boolean,
    public parentOf?: any,
    public childOf?: any,
  ) {
    this.section_id = section_id;
    this.section_label = section_label;
    this.label = label;
    this.options = options;
    this.type = type;
    this.required = required,
    this.enabled = enabled,
    this.parentOf = parentOf ? parentOf : null;
    this.childOf = childOf ? childOf : null;
  }
}


export class InitOption {
  constructor(
    public id: any,
    public question_id: any,
    public question_label: any,
    public label: string,
    public value: any,
    public name?: any,
    public price?: number,
    public link?: any,
  ) {
    this.id = id;
    this.question_id = question_id;
    this.question_label = question_label;
    this.label = label;
    this.value = value;
    this.name = '',
    this.price = 0,
    this.link = ''
  }
}
