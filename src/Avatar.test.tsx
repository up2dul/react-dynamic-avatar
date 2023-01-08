/**
 * Avatar test scenario
 * - should render an img with alt text
 */

import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Avatar from './Avatar';

describe('Avatar', () => {
  it('should render an img with alt text', () => {
    const props = {
      url: 'https://cataas.com/cat/says/hello%20world!',
      alt: 'a beautiful cat',
    };

    render(<Avatar {...props} />);
		const img = screen.getByAltText(props.alt);
    expect(img).toBeInTheDocument();
		expect(img.tagName).toBe('IMG');
  });
});
