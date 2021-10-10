import React from "react";
import { useParams } from "react-router";
import MaterialTable from "material-table";
import styled from "styled-components";
import { config } from "../config";

export const InstallmentTable = (props) => {
  const columns = [
    { title: "Id", field: "id" },
    { title: "Sender", field: "sender" },
    { title: "Receiver", field: "receiver" },
    { title: "Total Amount", field: "totalAmount" },
    { title: "Paid Amount", field: "paidAmount" },
  ];
  const { id } = useParams();
  return (
    <TableContainer>
      <MaterialTable
        title="Installment Data"
        columns={columns}
        options={{
          sorting: true,
          debounceInterval: 700,
          padding: "dense",
          filtering: false,
          search: false,
          paging: false,
        }}
        data={(query) =>
          new Promise((resolve, reject) => {
            // prepare your data and then call resolve like this:
            let url = `${config.backendBaseUrl}installments/${id}?`;

            //sorting
            if (query.orderBy) {
              url += `&parentId=${id}`;
              url += `&_sort=${query.orderBy.field}&_order=${query.orderDirection}`;
            }
            //filtering
            // if (query.filters.length) {
            //   const filter = query.filters.map((filter) => {
            //     return `&${filter.column.field}${filter.operator}${filter.value}`;
            //   });
            //   url += filter.join("");
            // }
            if (!query.orderBy) url += `parentId=${id}`;
            // //pagination
            // url += `&_page=${query.page + 1}`;
            // url += `&_limit=${query.pageSize}`;
            fetch(url)
              .then((resp) => resp.json())
              .then((resp) => {
                resolve({
                  data: resp, // your data array
                  page: query.page, // current page number
                  totalCount: 499, // total row number
                });
              });
          })
        }
      />
    </TableContainer>
  );
};

const TableContainer = styled.div`
  margin-top: 15vh;
  max-height: 70vh;
  overflow-y: scroll;
`;
