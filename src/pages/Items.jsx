import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItems } from '../store/itemsSlice'
import { useEffect } from 'react'
import Pagination from '../components/Pagination'
import { addItem } from '../store/itemsSlice'
import { updateItem } from '../store/itemsSlice'
import { deleteItem } from '../store/itemsSlice'
import { useState } from 'react'
import LoadingModel from './LoadingModel'
import { useCookies } from 'react-cookie'


function Items() {
  const dispatch = useDispatch();
  const itemsList = useSelector(state => state.items.items);
  // const [items,setItems] = useState(itemsList);
  const [search,setSearch] = useState('');
  const [isSearch,setIsSearch] = useState(false);
  const [cookies, setCookie] = useCookies(['user']);
  
  const loading = useSelector(state => state.items.loading)

  const handleItemSearch = (e) => {
    e.target.value === '' ? setIsSearch(false) : setIsSearch(true);
    setSearch(e.target.value);
  }

  const handleEditItemChange = (e) => {
    setEditItem({
      ...editItem,
      [e.target.name]: e.target.value
    })
    
  }
const handleEditItem = (item) => {
  setIsEditModalOpen(true)
  setEditItem(item)
}

const handleEditItemSubmit = (e) => {
  e.preventDefault();
  dispatch(updateItem(editItem)).then(() => {
    setIsEditModalOpen(false);
    setEditItem({});
    setReload(!reload);
  });
  
  
  
}

const handleDeleteItem = (item) => {
  setDeleteItemId(item._id);
  setIsDeleteModalOpen(true);
  // console.log('delete');
  // console.log(item._id);
}

const handleDeleteConfirm = (item) => {
  dispatch(deleteItem(deleteItemId)).then(() => {
    setIsDeleteModalOpen(false);
    setReload(!reload);
    setDeleteItemId('');
  });
  
}


  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [reload, setReload] = React.useState(false);
  const [deleteItemId, setDeleteItemId] = React.useState('');

  const [AddItem, setAddItem] = React.useState({});
  const [editItem, setEditItem] = React.useState({});

  const handleAddItem = (e) => {
    e.preventDefault();
    dispatch(addItem(AddItem)).then(() => {
      setIsAddModalOpen(false);
      setReload(!reload);
      setAddItem({});
    }
    );
  }

  const handleAddItemChange = (e) => {
    setAddItem({
      ...AddItem,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    dispatch(fetchItems());

  }
  , [reload,dispatch])

  useEffect(() => {
    if(!cookies.user) {
      window.location.href = '/login';
    }
  }
  , []);



  return (
    <div className='mx-[10vw]'>
      <h1 className='p-2 my-3 font-bold border-b-2'>Item Table</h1>
      <div className="flex justify-end">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={
          () => setIsAddModalOpen(!isAddModalOpen)
        }>Add Item</button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="mt-4 flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <label for="table-search" className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>
            <input onChange={handleItemSearch} type="text" id="table-search" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
          </div>
        </div>
        <table className="w-full overflow-x-scroll text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="py-3 px-4 font-medium">No</th>
              <th className="py-3 px-4 font-medium">Item</th>
              <th className="py-3 px-4 font-medium">Fees</th>
              <th className="py-3 px-4 font-medium">Action</th>
            </tr>

          </thead>
          <tbody>
           
            
            {itemsList && itemsList.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{item.itemName}</td>
                <td className="py-3 px-4">{item.fees}</td>
                
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                  <button className="text-blue-500 hover:text-blue-700" onClick={
                    () => handleEditItem(item)
                  }>Edit</button>
                  <button className="text-red-500 hover:text-red-700" onClick={
                    () => handleDeleteItem(item)
                  }>Delete</button>
                  </div>
                </td>
              </tr>
            ))  
            }
        
            {
              itemsList && itemsList.length === 0 && <tr><td className='text-center' colSpan={6}>No items found</td></tr>
            }
          </tbody>
        </table>
      </div>
      <div className="my-5">
        <Pagination />
      </div>

      {/* Add Model */}
      {isAddModalOpen && (
        
        <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-50">
          <div className="relative bg-white w-1/2 m-auto mt-10 p-5 rounded-lg">
            <h1 className="text-2xl font-bold mb-5">Add Item</h1>
            <button className="absolute top-5 right-5" onClick={() => setIsAddModalOpen(false)}>X</button>
            <form className='flex gap-5'>
              <div className="mb-4 w-1/2 ">
                <label for="item" className="block text-sm font-medium text-gray-700">Item</label>
                <input type="text" id="item" onChange={handleAddItemChange} name="itemName" value={AddItem.itemName} className="mt-1 p-2 w-full border border-gray-300 rounded-lg" />
              </div>
              <div className="mb-4 w-1/2 ">
                <label for="fees" className="block text-sm font-medium text-gray-700">Fees</label>
                <input type="number" id="fees" onChange={handleAddItemChange} name="fees" value={AddItem.fees} className="mt-1 p-2 w-full border border-gray-300 rounded-lg" />
              </div>
              
              
            </form>
              <div className="flex justify-end">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddItem}>Add Item</button>
              </div>
          </div>
          </div>
      )}

      {/* Edit Model */}

      {
        isEditModalOpen && (

          <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-50">
            <div className="relative bg-white w-1/2 m-auto mt-10 p-5 rounded-lg">
              <h1 className="text-2xl font-bold mb-5">Edit Item</h1>
              <button className="absolute top-5 right-5" onClick={() => setIsEditModalOpen(false)}>X</button>
              <form className='flex gap-5'>
                <div className="mb-4 w-1/2">
                  <label for="item" className="block text-sm font-medium text-gray-700">Item</label>
                  <input type="text" id="item" onChange={handleEditItemChange} name="itemName" value={editItem.itemName} className="mt-1 p-2 w-full border border-gray-300 rounded-lg" />
                </div>
                <div className="mb-4 w-1/2">
                  <label for="fees" className="block text-sm font-medium text-gray-700">Fees</label>
                  <input type="number" id="fees" onChange={handleEditItemChange} name="fees" value={editItem.fees} className="mt-1 p-2 w-full border border-gray-300 rounded-lg" />
                </div>
                
               
              </form>
              <div className="flex justify-end">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleEditItemSubmit}>Update Item</button>
              </div>
            </div>
      </div>
        )
      }

      {/* Delete Model */}
      {
        isDeleteModalOpen && (
          <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-50">
            <div className="relative bg-white w-1/4 m-auto mt-10 p-5 rounded-lg">
              <h1 className="text-2xl font-bold mb-5">Delete Item</h1>
              <button className="absolute top-5 right-5" onClick={() => setIsDeleteModalOpen(false)}>X</button>
              <p>Are you sure you want to delete this item?</p>
              <div className="flex justify-end">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDeleteConfirm}>Delete Item</button>
              </div>
            </div>
          </div>
        )
      }

      {
        loading && (
          <LoadingModel />
        )
      }


    </div>
  )
}

export default Items