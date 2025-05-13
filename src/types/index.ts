export type EffectFailDataAxiosError = {
  response: {
    data: {
      error: {
        Message: string;
        Text: string;
      };
    };
    status: number;
  };
};
