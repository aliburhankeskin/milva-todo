import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import StarIcon from '@material-ui/icons/Star';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useSelector, useDispatch } from 'react-redux'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import * as $AT from '../reducer/ActionTypes';
export default function Content() {
    const classes = useStyles();
    const { contentList, selectedCategory } = useSelector((state) => state.ContentReducer);
    const dispatch = useDispatch();
    const [value, setValue] = useState('');    

    const onChange = (event) => {
        setValue(event.target.value);
    }

    const addContent = () => {
        dispatch({ type: $AT.ADD_LIST_ITEM, payload: value });
        setValue('');
    }

    const deleteContent = (id) => {
        dispatch({ type: $AT.DELETE_LIST_ITEM, payload: id });
    }

    const favContent = (id) => {
        dispatch({ type: $AT.FAV_LIST_ITEM, payload: id })
    }
    return (
        <div className={classes.root}>
            <div className={classes.paper}>

                <h1 className={classes.header}>{selectedCategory?.name}</h1>

                <div className={classes.content}>
                    <List>
                        {contentList.map((item) => {

                            return (
                                <ListItem key={item.id} role={undefined} button
                                    className={classes.listItem}
                                >
                                    <ListItemIcon>
                                        <Tooltip title="Sil" aria-label="Sil" style={{ marginLeft: 15 }}>
                                            <DeleteOutlineIcon style={{ color: '#8690E8' }} onClick={() => deleteContent(item.id)} />
                                        </Tooltip>
                                    </ListItemIcon>

                                    <ListItemText primary={item.content} style={{ color: '#fff' }} />

                                    <ListItemSecondaryAction>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    onChange={() => favContent(item.id)}
                                                    icon={<StarBorderIcon style={{ color: '#fff' }} />}
                                                    checked={item.isFav ? true : false}
                                                    checkedIcon={<StarIcon />}
                                                    value={item.isFav || ''}
                                                />}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            );
                        })}
                    </List>
                </div>

                <div className={classes.addTask}>

                    <Input
                        id="standard-adornment-amount"
                        placeholder="Görev Ekle"
                        value={value}
                        onChange={onChange}
                        className={classes.input}
                    />

                    <Tooltip title="Add" aria-label="Ekle" style={{ marginLeft: 15 }}>
                        <Fab color="primary" className={classes.fab} size="small">
                            <AddIcon style={{ color: '#8690E8' }} onClick={addContent} />
                        </Fab>
                    </Tooltip>

                </div>
            </div>
        </div>
    )
}
const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2% 2%',
        width: '94%',
        height: '92vh',
    },
    paper: {
        width: '100%',
        height: '92vh',
        // backgroundColor:'#fff', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    header: {
        alignSelf: 'flex-start',
        width: '100%',
        fontSize: 30,
        color: '#fff'
    },
    content: {
        width: '98%',
        height: '75vh',
        maxHeight: '75vh',
        marginTop: 20,
        overflow: 'auto',
        padding: '0% 1%',
    },
    addTask: {
        marginTop: 20,
        width: '100%',
        borderRadius: 5,
        backgroundColor: 'rgba(39, 44, 52, 0.9)',
        padding: 10,

    },
    input: {
        color: '#8690E8',
        width: '95%',
    },
    listItem: {
        marginTop: 2,
        background: 'rgba(39, 44, 52, 0.9)',
        borderRadius: 5,
        '&:hover': {
            background: 'rgba(24, 27, 32, 1)'
        },
    }
}));
