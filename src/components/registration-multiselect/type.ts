import { PopoverUIProps } from '@ui/popover/type';
import { SelectUIProps } from '@ui/select/type';
import { TCheckboxItemUIProps } from '@ui/checkbox-item/type';

type PopoverConfigProps = Pick<PopoverUIProps, 'placement' | 'offset' | 'matchWidth' | 'maxWidth'>;

type SelectFieldProps = Pick<SelectUIProps, 'label' | 'placeholder' | 'value'>;

type CheckboxOnChange = TCheckboxItemUIProps['onChange'];

export type MultiselectOption = {
  id: number;
  label: TCheckboxItemUIProps['label'];
};

export type MultiselectUIProps = PopoverConfigProps &
  SelectFieldProps & {
    isOpen: PopoverUIProps['isOpen'];
    onClose: PopoverUIProps['onClose'];
    handleToggle: SelectUIProps['handleToggle'];
    options: MultiselectOption[];
    selectedIds: number[];
    onOptionChange: (id: number, e: Parameters<CheckboxOnChange>[0]) => void;
  };
