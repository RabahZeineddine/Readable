import React, { Component } from 'react'
import { Grid, Card, CardContent, Typography } from '@material-ui/core';


function NotFound() {
    return (
        <Grid container spacing={8} justify="center">
            <Card className="card notfound">
                <CardContent>
                    <Typography variant="subheading" component="h2">404: PAGE NOT FOUND</Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default NotFound