import React from 'react'
import { GridList, GridTile } from 'material-ui/GridList'
import Subheader from 'material-ui/Subheader'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridList: {
    width: '600px',
    height: '100%',
    overflowY: 'auto'
  }
}

export default React.createClass({
  render () {
    return (
      <div>
        <GridList
          cellHeight={180}
          style={styles.gridList}
        >
          <Subheader>Here is the outside of your echo chamber</Subheader>
          {this.props.stars.map((star) => (
            <GridTile
              key={star.id}
              title={star.name}
              subtitle={<span>by <b>{star.owner.login}</b></span>}
            >
              <img src={star.owner.avatar_url} />
            </GridTile>
          ))}
        </GridList>
      </div>
    )
  }
})
