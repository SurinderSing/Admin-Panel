import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import getData from "../AdminUI_JSON.json";

function AdminDesk() {
  const [search, setSearch] = useState("");
  const [datas, setDatas] = useState([]);
  const [filtredData, setFiltredData] = useState([]);

  const handleDelete = (id) => {
    setFiltredData(
      filtredData.filter((data) => {
        return data.id !== id;
      })
    );
  };

  useEffect(() => {
    setDatas(getData);
    setFiltredData(getData);
  }, [datas]);

  //
  //
  //search Query::

  useEffect(() => {
    const result = datas.filter((data) => {
      return (
        data.email.toLowerCase().match(search.toLowerCase()) ||
        data.name.toLowerCase().match(search.toLowerCase()) ||
        data.role.toLowerCase().match(search.toLowerCase()) ||
        data.id.toLowerCase().match(search.toLowerCase())
      );
    });
    setFiltredData(result);
  }, [search]);
  //
  //
  //multiple selection and deletion query::

  const [selectedRows, setSelectedRows] = useState();

  const handleMultiDeleteRowy = () => {
    const result = filtredData.filter(
      (data) => !selectedRows.selectedRows.includes(data)
    );
    setFiltredData(result);
  };

  //
  //
  //
  //Edit Function::
  const [editFields, setEditFields] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    const editedData = filtredData.map((elem) => {
      if (elem.id === editFields.id) {
        return {...elem, name ,email: email, role: role}
      }
      return elem;
    });
    setFiltredData(editedData);
  };

  //
  //
  // setting colmuns::
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <button
            className="sm-btn btn-outline-primary mx-1"
            onClick={() => {
              setEditFields(row);
              setName(row.name);
              setEmail(row.email);
              setRole(row.role);
            }}
          >
            edit
          </button>

          <button
            className="sm-btn btn-outline-danger"
            onClick={() => {
              handleDelete(row.id);
            }}
          >
            delete
          </button>
        </>
      ),
      maxWidth: "130px",
    },
  ];
  return (
    <>
      <DataTable
        title={"Employee DataTable"}
        columns={columns}
        data={filtredData}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="62vh"
        selectableRows
        selectableRowsHighlight
        selectableRowsVisibleOnly
        highlightOnHover
        subHeader
        onSelectedRowsChange={(Rows) => {
          setSelectedRows(Rows);
        }}
        subHeaderComponent={
          <>
            <input
              type="text"
              placeholder="Search"
              className="form-control"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <form onSubmit={handleSubmit} className="form-control mt-2 center">
              <input
                type="text"
                className="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                className="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                className="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
              <button className="btn-ms btn-primary" type="submit">
                save Edit
              </button>
            </form>
          </>
        }
        subHeaderAlign="center"
        actions={
          <button
            className="btn btn-outline-warning fixed-bottom w-25 mb-4 mx-3"
            onClick={() => {
              handleMultiDeleteRowy();
            }}
          >
            Delete Select
          </button>
        }
      />
    </>
  );
}

export default AdminDesk;
