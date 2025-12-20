export type IllustrationBlockUIProps = {
  illustration: React.ReactNode;
  title: string;
  description: string;
  actions?:
    | {
        primary?: boolean;
        text: string;
        onClick: () => void;
      }[]
    | null;
};
