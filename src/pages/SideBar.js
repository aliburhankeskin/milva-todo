/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ReorderIcon from '@material-ui/icons/Reorder';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import OpsiyonIcon from '../assets/icons/opsiyon.ico';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { useSelector, useDispatch } from 'react-redux';
import * as $AT from '../reducer/ActionTypes';
import HomeIcon from '@material-ui/icons/Home';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
export default function Sidebar() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [selected, setSelected] = React.useState();
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const { categories, contentList } = useSelector((state) => state.ContentReducer)

    const favoriCount = contentList.filter(i => i.isFav === true).length;

    useEffect(() => {

        dispatch({ type: $AT.GET_CATEGORY })

        const categoryId = localStorage.getItem('selectedId');

        setSelected(categoryId);

        dispatch({ type: $AT.UPDATE_LIST, payload: categoryId })


    }, [dispatch])


    const handleChangeContent = (routeName, selectedId) => {

        if (selectedId === -1) {
            setSelected(selectedId);
            history.push(`/${routeName}`)
        } else {
            localStorage.setItem('selectedId', selectedId);
            setSelected(selectedId);
            dispatch({ type: $AT.UPDATE_LIST, payload: selectedId })
            history.push(`/${routeName}`)
        }
    }

    const addCategory = () => {
        dispatch({ type: $AT.ADD_CATEGORY, payload: value });
        setValue('');
    }

    const deleteCateggory = (id) => {

        dispatch({ type: $AT.DELETE_CATEGORY, payload: id });


        if (selected === id) {
            if (categories.length === 0) {
                handleChangeContent('', -1)
            } else {
                handleChangeContent('Content', categories[0].id)
            }

        } else {
            console.log(categories.length);
            if (categories.length === 1) {
                handleChangeContent('', -1)
            }
        }
    }

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <List component="nav" style={{ width: '100%' }}>

                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <img src={OpsiyonIcon} alt="" style={{ objectFit: 'cover' }} width="40" height="40" />

                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="MilvaSoft Yazılım" style={{ color: '#fff' }}
                        secondary={

                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    style={{ color: '#fff' }}
                                >
                                    info@milvasoft.com
                                        </Typography>
                            </React.Fragment>
                        } />

                </ListItem>

                <ListItem button onClick={() => handleChangeContent('', -1)} className={classes.listItem}>
                    <ListItemIcon>
                        <HomeIcon style={{ color: '#D2534E' }} />
                    </ListItemIcon>
                    <ListItemText primary="Home" style={{ color: selected === -1 ? '#D2534E' : '#fff' }} />
                </ListItem>

                <ListItem button onClick={() => handleChangeContent('Content', -2)} className={classes.listItem}>
                    <ListItemIcon>
                        <StarBorderIcon style={{ color: '#64ffda' }} />
                    </ListItemIcon>
                    <ListItemText primary="Favoriler" style={{ color: selected === -2 ? '#64ffda' : '#fff' }} />

                    <ListItemSecondaryAction style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
                        {favoriCount}
                    </ListItemSecondaryAction>

                </ListItem>


                <Divider style={{ backgroundColor: '#fff', width: '90%', margin: 'auto' }} />

                {
                    categories.map((item) => (
                        <ListItem button onClick={() => handleChangeContent("Content", item.id)} className={classes.listItem} key={item.id}>
                            <ListItemIcon>
                                <ReorderIcon style={{ color: '#8690E8' }} />
                            </ListItemIcon>
                            <ListItemText primary={item.name} style={{ color: selected === Number(item.id)  ? '#8690E8' : '#fff' }} />
                            <ListItemSecondaryAction style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                                <p style={{ marginRight: 10 }}>{item.count}</p>


                                <Tooltip title="Sil" aria-label="Sil" style={{ marginLeft: 10, cursor: 'pointer' }}>
                                    <DeleteOutlineIcon color="secondary" onClick={() => deleteCateggory(item.id)} />
                                </Tooltip>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                }


            </List>



            <div className={classes.bottom}>


                <TextField
                    className={classes.textField}
                    id="input-with-icon-textfield"
                    label="Yeni List"
                    color="secondary"
                    value={value}
                    onChange={handleChange}
                    InputLabelProps={{
                        classes: {
                            root: classes.cssLabel,
                            focused: classes.cssFocused,
                        },
                    }}
                    InputProps={{
                        classes: {
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                        },
                    }}

                />
                <Tooltip title="Ekle" aria-label="add" style={{ marginLeft: 5 }}>
                    <Fab color="primary" className={classes.fab} size="small" onClick={addCategory}>
                        <AddIcon style={{ color: '#8690E8' }} />
                    </Fab>
                </Tooltip>

            </div>


        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    listItem: {
        '&:hover': {
            background: 'rgba(24, 27, 32, 1)'
        },
    },
    root: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'column',
        backgroundColor: theme.palette.primary.main
    },
    listItemText: {
        color: '#fff'
    },
    textField: {
        marginBottom: 30,
        color: '#fff',
        margin: 0,
        width: '70%',

    },
    bottom: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTop: '1px solid #fff',
        paddingTop: 10

    },
    cssLabel: {
        color: `#8690E8 !important`,
        '&$cssFocused': {
            color: '#8690E8',
        },
    },


    cssFocused: {
        borderColor: `#8690E8 !important`,      
    },
    cssOutlinedInput: {
        color: `#8690E8 !important`,
    },
}));