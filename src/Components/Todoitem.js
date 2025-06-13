// practice

import React, { useState } from 'react';

const Todoitems = () => {
  const [inputdata, setInputdata] = useState('');
  const [items, setItems] = useState([]);
  const [togglesubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);
  const addItem = () => {
    if (!inputdata) {
    } else if (inputdata && !togglesubmit) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputdata }
          }
          return elem;
        })
      )
      setToggleSubmit(true);
      setInputdata('');
      setIsEditItem(null);
    }
    else {
      const allInputData = { id: new Date().getTime().toString(), name: inputdata }
      setItems([...items, allInputData]);
      setInputdata('')
    }
  };
  const deleteItem = (index) => {
    const updateditems = items.filter((elem) => {
      return index !== elem.id;
    }
    );
    setItems(updateditems);
  };
  const editItem = (id) => {
    let newEditItem = items.find((elem) => {
      return elem.id === id
    });
    setToggleSubmit(false);
    setInputdata(newEditItem.name);
    setIsEditItem(id);
  };

  return (
    <>
      <div className="container card w-50 mt-5">
        <h1 className="heading">Todo List</h1>
        <div className="row justify-content-center ">
          <div className="col-xl-10 py-3">
            <input type="text" className="form-control" placeholder="Add your Task here"
              value={inputdata} onChange={(e) => setInputdata(e.target.value)} />
          </div>
          {
            togglesubmit ? <div className="col-xl-2">
              <button className=" my-3 btn btn-success" onClick={addItem} >Submit</button>
            </div> : <div className="col-xl-2">
              <button className=" my-3 btn btn-warning" onClick={addItem} >Save</button>
            </div>
          }

        </div>
        <div className="row justify-content-center">
          {
            items.map((elem) => {
              return (
                <>
                  <div className="col-6" key={elem.id}>
                    <input type="text" className="form-control my-3" value={elem.name} />
                  </div>
                  <div className="col-2">
                    <input type="checkbox" className="my-4 ms-5" />
                  </div>
                  <div className="col-2">
                    <button className="btn btn-primary my-3" onClick={() => editItem(elem.id)}>Edit</button>
                  </div>
                  <div className="col-2">
                    <button className="btn btn-danger my-3" onClick={() => {
                      if (
                        window.confirm("Item will be deleted")
                      ) {
                        deleteItem(elem.id, items.id);
                      }
                    }}>Delete</button>
                  </div>
                </>
              )
            }
            )
          }
        </div>
      </div>
    </>
  )
};
export default Todoitems;
