type Protocol = 'http' | 'https';

export interface Env {
  PROTOCOL: Protocol;
  API_ENDPOINT: string;
}

export interface Process {
  env: Env;
}

export interface ProcessWithExit extends Process {
  exit: (code: number) => void;
}
