export type WorkspaceReturnState = {
  errors?: {
    name?: string[];
  };
  success?: {
    redirectPath: string;
  };
};
