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
    this.choice = choice ? choice : undefined;
    this.price = price ? price : undefined;
    this.name = name ? name : undefined;
    this.link = link ? choice : undefined;
    this.error = choice ? choice : true;
  }
}
