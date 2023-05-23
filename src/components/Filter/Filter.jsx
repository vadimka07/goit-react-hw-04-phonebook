import PropTypes from 'prop-types';

function Filter({ value, onChange }) {
    return (
        <input type="text" name="filter" value={value} onChange={onChange} />
    );
}

export default Filter;

Filter.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
};
