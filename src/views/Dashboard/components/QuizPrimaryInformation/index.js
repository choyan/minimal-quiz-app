import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

export default function QuizPrimaryInformation({ register }) {
  return (
    <div className="bg-blue-200 p-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Quiz Name
        </label>
        <div className="mt-1">
          <input type="hidden" defaultValue={nanoid()} {...register('id')} />
          <input
            type="text"
            className="w-full"
            id="name"
            {...register('name', { required: true })}
          />
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="layout" className="block text-sm font-medium text-gray-700">
          Quiz Cover
        </label>
        <div className="mt-1">
          <input
            type="url"
            className="w-full"
            id="layout"
            {...register('cover', { required: true })}
          />
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="layout" className="block text-sm font-medium text-gray-700">
          Please select the Layout Type
        </label>
        <div className="mt-1">
          <select className="w-full" id="layout" {...register('layout', { required: true })}>
            <option value="all">All in a Single Page</option>
            <option value="separate">Separate</option>
          </select>
        </div>
      </div>
    </div>
  );
}

QuizPrimaryInformation.propTypes = {
  register: PropTypes.func,
};
