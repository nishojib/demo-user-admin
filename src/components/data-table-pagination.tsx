import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
} from '@chakra-ui/react';
import { type Table } from '@tanstack/react-table';
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleDown,
  FaAngleLeft,
  FaAngleRight,
} from 'react-icons/fa';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <Flex mt={5} alignItems="center" justifyContent="flex-end" gap={6}>
      <Flex alignItems="center" gap={2}>
        <Text>Rows per page</Text>
        <Menu>
          <MenuButton as={Button} rightIcon={<FaAngleDown />}>
            {table.getState().pagination.pageSize}
          </MenuButton>
          <MenuList>
            <MenuOptionGroup
              defaultValue="10"
              title="Page Size"
              type="radio"
              onChange={(pageSize) => {
                table.setPageSize(Number(pageSize));
              }}
            >
              {[10, 20, 50, 100].map((pageSize) => (
                <MenuItemOption key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Flex>
      <Flex width={100} alignItems="center" justifyContent="center">
        Page {table.getState().pagination.pageIndex + 1} of{' '}
        {table.getPageCount()}
      </Flex>
      <Flex alignItems="center" gap={2}>
        <Button
          variant="outline"
          onClick={() => table.setPageIndex(0)}
          isDisabled={!table.getCanPreviousPage()}
        >
          <FaAngleDoubleLeft />
        </Button>
        <Button
          variant="outline"
          onClick={() => table.previousPage()}
          isDisabled={!table.getCanPreviousPage()}
        >
          <FaAngleLeft />
        </Button>
        <Button
          variant="outline"
          onClick={() => table.nextPage()}
          isDisabled={!table.getCanNextPage()}
        >
          <FaAngleRight />
        </Button>
        <Button
          variant="outline"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          isDisabled={!table.getCanNextPage()}
        >
          <FaAngleDoubleRight />
        </Button>
      </Flex>
    </Flex>
  );
}
