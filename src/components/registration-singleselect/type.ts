import type { PopoverUIProps } from '@ui/popover/type';
import type { SelectUIProps } from '@ui/select/type';
import type { GenderId } from '@features/select-gender/constants';

type PopoverConfigProps = Pick<PopoverUIProps, 'placement' | 'offset' | 'matchWidth' | 'maxWidth'>;
type SelectFieldProps = Pick<SelectUIProps, 'label' | 'placeholder' | 'value'>;

export type SingleselectUIProps = PopoverConfigProps &
  SelectFieldProps & {
    isOpen: PopoverUIProps['isOpen'];
    onClose: PopoverUIProps['onClose'];
    handleToggle: SelectUIProps['handleToggle'];

    options: { id: GenderId; label: string }[];
    selectedId: GenderId;
    onSelect: (id: GenderId) => void;
  };
