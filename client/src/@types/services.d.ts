export interface Parent {
  id: string;
  name: string;
  services?: Service[];
}

export interface Service {
  service_id: string; // Primary key
  id: string;         // Service identifier 
  parent_id: string;
  aid: string;
  address: string;
  port: number;
  tags: TagField[] | null;
  meta: Record<string, string> | null;
  check: Record<string, string> | null;
  parent?: Parent;
}

export interface TagField {
  id: string;
  value: string;
}


export interface ServiceFormData {
  Name: string;
  ID: string;
  Address: string;
  Port: number;
  tags?: TagField[];
  Meta?: Record<string, string>;
  Check?: Record<string, string>;
}