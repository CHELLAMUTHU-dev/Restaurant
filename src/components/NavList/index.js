import './index.css'

const NavList = props => {
  const {category, active, updateActiveTab} = props

  const activeTab = active ? 'active' : 'inactive'

  return (
    <li
      className={`nav-tab ${activeTab}`}
      onClick={() => updateActiveTab(category)}
    >
      {category}
    </li>
  )
}
export default NavList
