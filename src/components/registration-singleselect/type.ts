import type { PopoverUIProps } from '@ui/popover/type';
import type { SelectUIProps } from '@ui/select/type';

type PopoverConfigProps = Pick<PopoverUIProps, 'placement' | 'offset' | 'matchWidth' | 'maxWidth'>;
type SelectFieldProps = Pick<SelectUIProps, 'label' | 'placeholder' | 'value'>;

export type SingleselectOption<TId extends string | number> = {
  id: TId;
  label: string;
};

export type SingleselectUIProps<TId extends string | number> = PopoverConfigProps &
  SelectFieldProps & {
    isOpen: PopoverUIProps['isOpen'];
    onClose: PopoverUIProps['onClose'];
    handleToggle: SelectUIProps['handleToggle'];
    options: SingleselectOption<TId>[];
    selectedId: TId | null;
    onSelect: (id: TId) => void;
    disabled?: boolean;
  };
