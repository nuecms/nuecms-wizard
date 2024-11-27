


export interface Field {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
}

export interface Step {
  title: string;
  key: string;
  fields: Field[];
  children?: Step[];
}


export interface Config {
  mysql: {
    host: string;
    port: string;
    username: string;
    password: string;
    database: string;
  };
  redis: {
    host: string;
    port: string;
    password: string;
  };
}
