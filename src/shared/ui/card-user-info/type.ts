export type TCardUserInfoUIProps = {
  avatar: string;
  name: string;
  bio: string;
  ageText: string;
  cityName: string;

  teachTag: {
    label: string;
    bgColor: string;
  };

  learnTags: {
    id: number;
    label: string;
    bgColor: string;
  }[];
};
