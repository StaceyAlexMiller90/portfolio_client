import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { getUserWithStoredToken } from './store/user/actions'
import { selectAppLoading } from './store/appState/selectors'
import LandingPage from './pages/LandingPage'
import Browse from './pages/Browse'
import AddRecords from './pages/AddRecords'
import Summary from './pages/Summary'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Loading from './components/Loading'
import NavigationBar from './components/NavigationBar'
import MessageBox from './components/MessageBox'
import ManualAddRecord from './components/ManualAddRecord'
import './App.css'

function App() {
  const dispatch = useDispatch()
  const isLoading = useSelector(selectAppLoading)

  useEffect(() => {
    dispatch(getUserWithStoredToken())
  }, [dispatch])

  return (
    <div className="App">
      <NavigationBar />
      <MessageBox />
      {isLoading && <Loading />}
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/browse" component={Browse} />
        <Route path="/addrecords" component={AddRecords} />
        <Route path="/manualadd" component={ManualAddRecord} />
        <Route path="/summary" component={Summary} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  )
}

export default App
