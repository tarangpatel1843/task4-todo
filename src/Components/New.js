// practice

import React, { useState } from 'react';
import "./Todo.css";

const New = () => {
    const [inputdata, setInputdata] = useState('');
    const [items, setItems] = useState([]);
    const [isEditItem, setIsEditItem] = useState(null);
    const [togglesubmit, setToggleSubmit] = useState(true);

    const addItem = () => {
        if (!inputdata.trim()) {
            return;
        } else if (inputdata && !isEditItem) {
            const allInputData = { id: new Date().getTime().toString(), name: inputdata, completed: false };
            setItems([...items, allInputData]);
            setInputdata('');
        } else if (inputdata && isEditItem) {
            setItems(items.map((elem) => {
                if (elem.id === isEditItem) {
                    return { ...elem, name: inputdata };
                }
                return elem;
            }));
            setInputdata('');
            setIsEditItem(null);
        }
    };

    const editItem = (id) => {
        setIsEditItem(id);
        const item = items.find(item => item.id === id);
        if (item) {
            setInputdata(item.name);
        }
    };

    const deleteItem = (ind) => {
        const updateitems = items.filter((_elem, index) => index !== ind);
        setItems(updateitems);
    };

    const removeall = () => {
        setItems([]);
    };

    const handleToggleComplete = (id) => {
        const newItems = items.map((item) => {
            if (item.id === id) {
                return { ...item, completed: !item.completed };
            }
            return item;
        });
        setItems(newItems);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addItem();
        }
    };

    return (
        <>
            <div className="container">
                <h1>Todo List</h1>
                <div className="row">
                    <div className="col-md-6 mt-4">
                        <input
                            type="text"
                            placeholder="Enter task"
                            value={inputdata}
                            onChange={(e) => setInputdata(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                    </div>

                    <div className="col-md-2 mt-4 mb-2 btn-sm">
                        <input
                            type="button"
                            value="+"
                            className="btn btn-primary btn-sm"
                            onClick={addItem}
                        />
                    </div>
                    {togglesubmit ? <div className="col-md-4 mt-4 mb-2 btn-md">
                        <input
                            type="submit"
                            value="Submit Menu"
                            className="btn btn-primary"
                            onClick={addItem}
                        />
                    </div> : <div className="col-xl-2">
                        <button className=" my-3 btn btn-success" onClick={addItem} >Save</button>
                    </div>
                    }
                </div>
                <div className="row">
                    {items.map((elem, ind) => (
                        <>
                            <div className="col-md-6 mt-4">
                                <input
                                    type="text"
                                    value={isEditItem === elem.id ? inputdata : elem.name}
                                    readOnly={isEditItem !== elem.id}
                                    onChange={(e) => setInputdata(e.target.value)}
                                />
                            </div>
                            <div className="col-md-2 mt-4">
                                <input
                                    type="checkbox"
                                    checked={elem.completed}
                                    onChange={() => handleToggleComplete(elem.id)}
                                />
                            </div>
                            <div className="col-md-2 mt-3">
                                <button
                                    className="btn btn-primary mb-2"
                                    onClick={() => editItem(elem.id)}
                                    disabled={elem.completed}
                                >
                                    Edit
                                </button>
                            </div>
                            <div className="col-md-2 mt-3">
                                <button
                                    className="btn btn-danger mb-2"
                                    onClick={() => {
                                        const confirmBox = window.confirm(
                                            "Are you sure to delete item ??"
                                        );
                                        if (confirmBox === true) {
                                            deleteItem(ind);
                                        }
                                    }}
                                >
                                    Del
                                </button>
                            </div>
                        </>
                    ))}
                </div>
                <div className="btn effect04 mt-5" data-sm-link-text="RemoveAll">
                    {items.length >= 1 && (
                        <button
                            className="btn btn-danger mt-1"
                            onClick={() => {
                                if (
                                    window.confirm(
                                        "Are you sure to remove all item ??"
                                    )
                                ) {
                                    removeall();
                                }
                            }}
                        >
                            Remove All
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default New;
