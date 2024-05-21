export interface IServerConfig {
  url: string;
  username: string;
  password: string;
}

export interface IAppContext {
  isServerConfigured: boolean
  serverProtocol: string
  setServerProtocol: (value: React.SetStateAction<string>) => void
  serverUrl: string
  setServerUrl: (value: React.SetStateAction<string>) => void
  serverUsername: string
  setServerUsername: (value: React.SetStateAction<string>) => void
  serverPassword: string
  setServerPassword: (value: React.SetStateAction<string>) => void
  handleSaveServerConfig: () => Promise<void>
  handleRemoveServerConfig: () => Promise<void>
}