import { City } from '@api/types';
import { PopoverUIProps } from '@ui/popover/type';
import { SelectUIProps } from '@ui/select/type';

type PopoverConfigProps = Pick<
  PopoverUIProps,
  'placement' | 'offset' | 'matchWidth' | 'maxWidth' | 'isOpen' | 'onClose'
>;

type SelectConfigProps = Pick<
  SelectUIProps,
  'label' | 'placeholder' | 'value' | 'handleToggle' | 'query' | 'handleQueryChange' | 'handleClear'
>;

export type SearchSelectUIProps = PopoverConfigProps &
  SelectConfigProps & {
    options: City[];
    onSelect: (city: City) => void;
    errorMessage?: string;
  };
