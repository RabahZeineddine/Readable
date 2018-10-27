import React from 'react';
import { connect } from 'react-redux'
import { fetchCategories } from '../../actions/categoriesActions'
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Chip
} from '@material-ui/core'

import DoneIcon from '@material-ui/icons/Done'
import { Link } from 'react-router-dom'
import './categories.css'

function Categories(props) {
    const { categories } = props
    const selectedCategory = props.category
    return (
        <Grid item xs={12}>
            <Card className="spacing-top">
                <CardContent>
                    <Typography variant="subheading" color="textSecondary">
                        Categories:
                        </Typography>
                    <div className="categories">
                        {categories && (
                            <Link to="/" className="category-link">
                                {selectedCategory === undefined ?
                                    <Chip label="All" className="category" clickable color="primary" icon={<DoneIcon />} />
                                    : <Chip label="All" className="category" clickable />
                                }
                            </Link>
                        )}
                        {categories && categories.items.map(category => (
                            <Link to={`/${category.name}`} key={category.name} className="category-link">
                                {selectedCategory !== undefined && category.name === selectedCategory ?
                                    <Chip label={category.name} className="category" key={category.name} clickable color="primary" icon={<DoneIcon />} />
                                    : <Chip label={category.name} className="category" key={category.name} clickable />
                                }
                            </Link>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </Grid >
    )
}

const mapStateToProps = ({ categories }) => {
    return {
        categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => dispatch(fetchCategories())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Categories);