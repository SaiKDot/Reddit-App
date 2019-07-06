 import React from 'react';
 import { connect } from "react-redux";
 import SubredditList from './Lists/SubredditList';
 import  {toggleRight} from '../actions/ui_actions';

  class RightPanel extends React.Component {

        handleRightClick(e) {
            this.props.toggleRight(e)
            // let panelLeft = document.querySelector('.panels__side--left');
            // let panelRight = document.querySelector('.panels__side--right');
            // panelRight.classList.toggle('panels__side--right-active');
            // panelLeft.classList.toggle('panels__side--left-hidden');
        }



        render() {
          
                return ( 
                	<article className={'panels__side panels__side--right '+(this.props.right_open && this.props.left_hide ? ' panels__side--right-active' : '' ) + (this.props.left_open && this.props.right_hide ? ' panels__side--right-hidden' : '')} >
		                <div className="panels__side panels__side--inner">
		                  <h1 className="panels__headline">Subreddit</h1>
		                  <svg className="arrow arrow--right" width="40" height="40" viewBox="0 0 24 24" onClick={(e) => this.handleRightClick(e)}  ><path d="M0 0h24v24h-24z" fill="none"/><path d="M12 4l-1.41 1.41 5.58 5.59h-12.17v2h12.17l-5.58 5.59 1.41 1.41 8-8z"/></svg>
		                </div>
		                <SubredditList/>
	              </article>
       	);
       }   


}


const mapStateToProps = state => {
  return {
   
    left_open:state.uis.left_open,
    right_open:state.uis.right_open,
    right_hide:state.uis.right_hide,
    left_hide:state.uis.left_hide
    
  }
}


export default connect(mapStateToProps,{toggleRight})(RightPanel);
