import React from 'react'
import { Link } from 'react-router-dom'

const BlogCard = (props) => {
	const { id, title, description, date, image } = props
	return (
		<section style={{ backgroundColor: "#eee" }}>
			<div className="container py-5">
				<div className="row justify-content-center mb-3">
					<div className="col-md-12 col-xl-10">
						<div className="card shadow-0 border rounded-4">
							<div className="card-body">
								<div className="row">
									<div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
										<div className="bg-image hover-zoom ripple rounded ripple-surface">
											<img src={image ? image : "images/blog-1.jpg"}
												className="w-100" />
											<a href="#!">
												<div className="hover-overlay">
													<div className="mask" style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}></div>
												</div>
											</a>
										</div>
									</div>
									<div className="col-md-6 col-lg-6 col-xl-6">
										<h5 className='mt-4'>{title}</h5>
										<div className="mt-1 mb-0 text-muted small">
											<span>{date}</span>
										</div>
										<p className="desc mt-2" dangerouslySetInnerHTML={{ __html: description.substr(0, 230) + "..." }}>
										</p>
									</div>
									<div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">

										<div className="d-flex flex-column mt-4">
											<button className="btn btn-white-outline btn-sm" type="button"><i className="fa-solid fa-cubes-stacked text-primary fa-xl fw-bold"></i></button>
											<Link to={"/blog/" + id} className='btn btn-sm btn-primary'>
												Read More
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default BlogCard