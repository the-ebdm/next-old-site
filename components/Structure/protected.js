
export default Protected = ({user, page, children}) => {
	if(user.id) {
		return (
			<>
				{children}
			</>
		)
	} else {
		if(page === true) {
			return (
				<div>
					<h1>401 - Unauthorized</h1>
				</div>
			)
		} else {
			return null
		}
	}
}