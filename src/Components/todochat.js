import React, { useState, useRef, useEffect } from 'react';
import "./Todo.css"

const Todochat = () => {
    const [inputdata, setInputdata] = useState('');
    const [items, setItems] = useState([]);
    const [isEditItem, setIsEditItem] = useState(null);
    const [togglesubmit, setToggleSubmit] = useState(true);
    const inputRef = useRef(null);

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('todoItems'));
        if (storedItems) {
            setItems(storedItems);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todoItems', JSON.stringify(items));
    }, [items]);

    const setInputValue = (e) => {
        setInputValue(e.target.value);
    };

    const addItem = () => {
        if (!inputdata.trim()) {
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

    const editItem = (id) => {
        setIsEditItem(id);
        const item = items.find(item => item.id === id);
        if (item) {
            setInputdata(item.name);
            setToggleSubmit(false);
        }
    };
    const deleteItem = (id) => {
        const updateitems = items.filter((_elem, ind) => {
            return ind !== id;
        });
        setItems(updateitems);
    }
    const removeall = () => {
        setItems([]);
    }

    // check box
    const handleToggleComplete = (id) => {
        const newItems = items.map((item) => {
            if (item.id === id) {
                return { ...item, completed: !item.completed };
            }
            return item;
        });
        setItems(newItems);
    };

    //edit btn
    const handleFocusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <>
            <div className="container">
                <h1> Todo List</h1>
                <div className="row">
                    <div className="col-md-6 mt-4">
                        <input type="text"
                            placeholder='Enter task'
                            value={inputdata}
                            onChange={(e) => setInputdata(e.target.value)}
                            ref={inputRef}
                        />
                    </div>
                    {togglesubmit ? 
                        <div className="col-md-4 mt-4 mb-2 btn-md">
                            <input type="submit" value="Submit Menu" className='btn btn-primary' onClick={addItem} />
                        </div> : 
                        <div className="col-md-2 mt-4 mb-2 btn-md">
                            <input type="submit" value="Save" className='btn btn-success' onClick={addItem} />
                        </div>
                    }
                </div>
                <div className="row">
                    {items.map((elem, ind) => (
                        <><div className="col-md-6 mt-4" key={ind}>
                            <input type='text' value={elem.name} />
                        </div><div className="col-md-2 mt-4">
                                <input
                                    type="checkbox"
                                    checked={elem.completed}
                                    onChange={() => handleToggleComplete(elem.id)} />
                            </div><div className="col-md-2 mt-3">
                                <button
                                    className="btn btn-primary mb-2"
                                    onClick={() => editItem(elem.id)}
                                    disabled={elem.completed}
                                >
                                    Edit
                                </button>
                            </div><div className="col-md-2 mt-3" key={ind}>
                                <button
                                    className="btn btn-danger mb-2"
                                    onClick={() => {
                                        const confirmBox = window.confirm("Are you sure to delete item ??");
                                        if (confirmBox === true) {
                                            deleteItem(ind);
                                        }
                                    } }>
                                    Del
                                </button>
                            </div></>
                    ))}
                </div>
                <div className="btn effect04 mt-5" data-sm-link-text="RemoveAll" >
                    {items.length >= 1 && 
                        <button className='btn btn-danger mt-1' onClick={() => {
                            if (window.confirm("Are you sure to remove all item ??")) {
                                removeall();
                            }
                        }}>
                            Remove All
                        </button>
                    }
                </div>
            </div>
        </>
    );
}

export default Todochat;
