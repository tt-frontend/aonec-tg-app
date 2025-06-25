export type Props = {
  fileHandler: (files: FileList) => void;
  accept?: string;
  uniqId: string;
  isLoading: boolean;
};
