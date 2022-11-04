import axios from "axios";
import useSWR from "swr";
import {
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Spinner,
} from "@chakra-ui/react";
import { Book } from "mocks/types";

// const fetcher = (url: string) => fetch(url).then((r) => r.json());
const fetcher = (url: string) => {
  const books = axios.get(url).then((res) => {
    return res.data;
  });
  // console.log(books);
  return books;
};

export const BooksGet = () => {
  const { data: books, error } = useSWR("/books", fetcher);

  return (
    <Container>
      <TableContainer whiteSpace="normal" mb="8">
        {error && <Box>エラー</Box>}
        {!books && <Spinner />}
        {books && (
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>タイトル</Th>
                <Th>説明</Th>
              </Tr>
            </Thead>
            <Tbody>
              {books.map((book: Book, index: number) => (
                <Tr key={index}>
                  <Td>{book.title}</Td>
                  <Td>{book.description}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </TableContainer>
    </Container>
  );
};
