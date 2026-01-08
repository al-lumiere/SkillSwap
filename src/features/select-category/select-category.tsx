import { FC, useState, useEffect } from 'react';
import { PopoverUI } from '@ui/popover';
import { SelectUI } from '@ui/select';
import { RootState, useDispatch, useSelector } from '@store/store';
import { fetchCategories } from '@slices/categories/categoriesSlice';
import { CheckboxItemUI } from '@ui/checkbox-item';

export const SelectCategory: FC = () => {
  const dispatch = useDispatch();

  const [isOpen, setOpen] = useState(false);
  const [selectedCategoriesIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categories = useSelector((state: RootState) => state.categories.data);

  const handleSelect = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    setSelectedIds((prev) => (checked ? [...prev, id] : prev.filter((x) => x !== id)));
  };

  return (
    <PopoverUI
      isOpen={isOpen}
      onClose={() => setOpen(!isOpen)}
      anchor={
        <SelectUI
          isOpen={isOpen}
          placeholder="Выберите категорию"
          label="Категория навыка, которому хотите научиться"
          handleToggle={() => {
            setOpen((v) => !v);
          }}
          value={selectedCategoriesIds.length ? `Выбрано: ${selectedCategoriesIds.length}` : undefined}
        />
      }
      placement="bottom-start"
      offset={-1}
      matchWidth
    >
      <fieldset
        style={{
          border: 'none',
          margin: '0',
          padding: '8px 0 8px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        {categories.map((category) => (
          <CheckboxItemUI
            key={category.id}
            label={category.name}
            checked={selectedCategoriesIds.includes(category.id)}
            onChange={(checked) => handleSelect(category.id, checked)}
          />
        ))}
      </fieldset>
    </PopoverUI>
  );
};
