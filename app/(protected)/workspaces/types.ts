export type WorkspaceReturnState = {
  errors?: {
    name?: string[];
  };
  success?: {
    redirectPath: string;
  };
};

export type InviteReturnState = {
  errors?: {
    email?: string[];
  };
  success?: boolean;
};
