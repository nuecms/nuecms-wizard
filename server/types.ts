export interface MysqlConfig {
  server?: string;
  host: string;
  port: number | string;
  username: string;
  password: string;
  database?: string;
  prefix?: string;
}


export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
}

export interface AdminConfig {
  username: string;
  password: string;
  password2: string;
}

export interface UploadConfig {
  storagePath: string;
  maxSize: number;
  allowedTypes: string[];
}

// cookie
export interface CookieConfig {
  prefix: string;
  domain: string;
  path: string;
}

// password salt
export interface PasswordConfig {
  salt: string;
}

// security
export interface SecurityConfig {
  secret: string;
  algorithm: string;
  rounds: number;
}



export interface Configs {
  mysql: MysqlConfig;
  redis: RedisConfig;
  admin: AdminConfig;
  upload: UploadConfig;
  cookie: CookieConfig;
  password: PasswordConfig;
  [key: string]: any;
}


