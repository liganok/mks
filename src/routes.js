import React from 'react'
import {Route, Switch } from 'react-router-dom'

import Login from './components/Login'
import Register from './components/Register'
import Setting from './components/Setting'
import AgendaList from './components/Agenda'
import AgendaItem from './components/AgendaItem'
import AgendaDetail from './components/AgendaDetail'
import Play from './components/AgendaPlay'
import TemplateList from './components/Template'
import TrashList from './components/Trash'
import Help from './components/Help'

export default (
    <Switch>
        <Route exact path='/' component={AgendaList} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/AgendaItem' component={AgendaItem} />
        <Route path='/template/detail/:id' component={AgendaDetail} />
        <Route path='/template/play/:id' component={Play} />
        <Route path='/agenda/detail/:id' component={AgendaDetail} />
        <Route path='/agenda/play/:id' component={Play} />
        <Route path='/new' component={AgendaDetail} />
        <Route path='/setting' component={Setting} />
        <Route path='/agenda' component={AgendaList} />
        <Route path='/template' component={TemplateList} />
        <Route path='/trash' component={TrashList} />
        <Route path='/help' component={Help} />
    </Switch>
)