/**
 * Avatar test scenario
 * - should render an img with alt text
 * - should use a fallback image if no URL passed in
 * - should use a fallback image if image fails to load
 * - should use a fallback image if url is empty string
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import Avatar, {
  FALLBACK_AVATAR_ALT_TEXT,
  FALLBACK_AVATAR_URL,
} from './Avatar';

describe('Avatar', () => {
  beforeEach(() => {
    cleanup();
  });

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

  it('should use a fallback image if no URL passed in', () => {
    render(<Avatar />);
    const img = screen.getByAltText(FALLBACK_AVATAR_ALT_TEXT);
    expect(img).toHaveAttribute('src', FALLBACK_AVATAR_URL);
  });

  it('should use a fallback image if image fails to load', () => {
    render(<Avatar url='https://hello.com/fake.png' />);

    const img = screen.getByAltText(FALLBACK_AVATAR_ALT_TEXT);
    fireEvent.error(img);
    expect(img).toHaveAttribute('src', FALLBACK_AVATAR_URL);
  });

  it('should use a fallback image if url is empty string', () => {
    render(<Avatar url='' />);

    const img = screen.getByAltText(FALLBACK_AVATAR_ALT_TEXT);
    fireEvent.error(img);
    expect(img).toHaveAttribute('src', FALLBACK_AVATAR_URL);
  });
});
