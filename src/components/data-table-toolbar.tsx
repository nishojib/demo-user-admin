import {
  Button,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from '@chakra-ui/react';
import { type Table } from '@tanstack/react-table';
import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const [searchText, setSearchText] = useState('');
  const [columnFilter, setColumnFilter] = useState<string | string[]>('');

  const handleFilter = () => {
    table.setColumnFilters([
      {
        id: 'status',
        value: columnFilter,
      },
      {
        id: 'id',
        value: searchText,
      },
    ]);
  };

  return (
    <Flex alignItems="center" gap={2}>
      <Menu>
        <MenuButton as={Button} rightIcon={<FaAngleDown />}>
          Filters
        </MenuButton>
        <MenuList>
          <MenuOptionGroup
            defaultValue="all"
            title="Filters"
            type="radio"
            onChange={(value) => {
              if (value === 'all') {
                setColumnFilter('');
              } else {
                setColumnFilter(value);
              }
            }}
          >
            {['all', 'inactive', 'active', 'unknown'].map((filter) => (
              <MenuItemOption key={filter} value={`${filter}`}>
                {filter}
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
      <Input
        placeholder="Search"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />
      <Button onClick={handleFilter}>Search</Button>
    </Flex>
  );
}
