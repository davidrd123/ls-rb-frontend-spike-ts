// types.ts

export interface Bin {
  id: number;
  binPath: string;
  createdAt: Date;
  lastRequest?: Date; // Marked optional because it's allowNull: true in Sequelize
}

export interface RequestEvent {
  client_ip: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'CONNECT' | 'OPTIONS' | 'TRACE';
  url: string;
  path: string;
  headers: Record<string, unknown>; // Assuming headers are key-value pairs
  body: Record<string, unknown>;
  query: Record<string, unknown>;
  protocol_version: string;
  tls_info: Record<string, unknown>; // Replace with actual structure if known
}

export interface RequestPayload {
  raw: string;
}

export interface Request {
  id: string; // Transformed _id field from MongoDB
  binPath: string;
  event: RequestEvent;
  payload: RequestPayload;
  timestamp: Date;
}
