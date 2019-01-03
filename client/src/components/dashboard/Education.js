import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment'
import { deleteEducation } from '../../actions/profileActions'

class Education extends Component {
  onDeleteClick(id) {
    this.props.deleteEducation(id);
  }

  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -  {edu.to === null ? (' Now') : (<Moment format="YYYY/MM/DD">{edu.to}</Moment>)}
        </td>
        <td>
          <button 
            onClick={this.onDeleteClick.bind(this, edu._id)}
            className="btn btn-danger">Delete</button>
        </td>
      </tr>
    ))
    return (
      <div>
        <h4 className="mb-4">Education Credentails</h4>
          <table className="table">
            <thead>
              <tr>
                <th className="w-25">School</th>
                <th className="w-25">Degree</th>
                <th className="w-25">Years</th>
                <th className="w-25"></th>
              </tr>
                {education}
            </thead>
          </table>
      </div>
    )
  }
}
Education.propType = {
  deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(Education);