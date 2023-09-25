import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../features/products/productSlice';
import ESpinner from '../components/ESpinner';

const OurStore = () => {

  const [grid, setGrid] = useState(4)
  const productState = useSelector((state) => state?.product?.product)
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])

  // filter states
  const [tag, setTag] = useState(null)
  const [category, setCategory] = useState(null)
  const [brand, setBrand] = useState(null)
  const [minPrice, setMinPrice] = useState(null)
  const [maxPrice, setMaxPrice] = useState(null)
  const [sort, setSort] = useState(null)

  const refreshbtn = () => {
    window.location.reload()
  }

  useEffect(() => {
    let newBrands = []
    let category = []
    let newtags = []
    let newColors = []
    for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      newBrands.push(element.brand)
      category.push(element.category)
      newtags.push(element.tags)
      newColors.push(element.color)
    }
    setBrands(newBrands)
    setCategories(category)
    setTags(newtags)
  }, [productState])

  const dispatch = useDispatch()
  useEffect(() => {
    getProducts()
  }, [sort, tag, brand, category, minPrice, maxPrice])
  const getProducts = () => {
    dispatch(getAllProducts({ sort, tag, brand, category, minPrice, maxPrice }))
  }

  const [showspin, setShowspin] = useState(true)

  setTimeout(() => {
    setShowspin(false)
  }, 1000);


  return (
    <>
      {
        showspin ? <div style={{ margin: "284px" }}><ESpinner /></div> :
          <div className="container">
            <div className="row">
              <div className="col-4">
                <div className='mt-4'>
                  <h3 className="filter-title">Categories&nbsp; <i onClick={refreshbtn} style={{ cursor: "pointer" }} className="fa-solid fa-rotate"></i></h3>
                  <div>
                    <ul className='ps-0' style={{ cursor: "pointer", listStyleType: "none" }}>
                      {
                        categories && [...new Set(categories)].map((item, index) => {
                          return <li key={index} onClick={() => setCategory(item)}>{item}</li>
                        })
                      }
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className='mt-4 mb-3'>
                  <h3 className="filter-title">Filter&nbsp; <i onClick={refreshbtn} style={{ cursor: "pointer" }} className="fa-solid fa-rotate"></i></h3>
                  <div>
                    <h5 className="sub-title text-secondary">Price</h5>
                    <div className='d-flex align-items-center gap-10'>
                      <div className="form-floating">
                        <input type="number" className="form-control" id="floatingInput" placeholder="From" onChange={(e) => setMinPrice(e.target.value)} />
                        <label htmlFor="floatingInput">From</label>
                      </div>
                      <div className="form-floating">
                        <input type="number" className="form-control" id="floatingInput1" placeholder="To" onChange={(e) => setMaxPrice(e.target.value)} />
                        <label htmlFor="floatingInput1">To</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className='mt-4 mb-3'>
                  <h3 className="sub-title">Tags&nbsp; <i onClick={refreshbtn} style={{ cursor: "pointer" }} className="fa-solid fa-rotate"></i></h3>
                  <div>
                    <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                      {
                        tags && [...new Set(tags)].map((item, index) => {
                          return (
                            <span style={{ cursor: "pointer" }} onClick={() => setTag(item)} key={index} className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3">
                              {item}
                            </span>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
                <div className='mb-3'>
                  <h3 className="sub-title">Brands&nbsp; <i onClick={refreshbtn} style={{ cursor: "pointer" }} className="fa-solid fa-rotate"></i></h3>
                  <div>
                    <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                      {
                        brands && [...new Set(brands)].map((item, index) => {
                          return (
                            <span style={{ cursor: "pointer" }} onClick={() => setBrand(item)} key={index} className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3">
                              {item}
                            </span>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center gap-10 mt-3">
              <p className="mb-0 d-block  border-0" style={{ width: "100px" }}>Sort By:</p>
              <select style={{ fontFamily: "'Ubuntu', sans-serif" }} name="" defaultValue={"manual"} className='form-control form-select' id="" onChange={(e) => setSort(e.target.value)}>

                <option value="title">Alphabetically : A-Z</option>
                <option value="-title">Alphabetically : Z-A</option>
                <option value="price">Price : low to high</option>
                <option value="-price">Price : high to low</option>
                <option value="createdAt">Date : old to new</option>
                <option value="-createdAt">Date : new to old</option>
              </select>

            </div>
            <div className="products-list pb-5">
              <div className="d-flex gap-10 flex-wrap">
                <ProductCard data={productState ? productState : []} grid={grid} />
              </div>
            </div>
          </div>
      }

    </>
  )
}

export default OurStore