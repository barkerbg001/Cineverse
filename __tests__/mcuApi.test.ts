import {
  getNextMCUMovie,
  getPlaceholderMovie,
  MCU_API_URL,
} from '../src/services/mcuApi';

const mockFetch = (impl: () => Promise<Partial<Response>>) => {
  globalThis.fetch = jest.fn(impl) as unknown as typeof fetch;
};

describe('getNextMCUMovie', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it('returns the parsed API response on success', async () => {
    const movie = {
      id: 1,
      type: 'movie',
      title: 'Example',
      poster_url: 'https://example.com/poster.jpg',
      release_date: '2030-01-01',
      overview: 'Overview',
      days_until: 10,
    };
    mockFetch(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(movie),
      }),
    );

    await expect(getNextMCUMovie()).resolves.toEqual(movie);
    expect(globalThis.fetch).toHaveBeenCalledWith(MCU_API_URL);
  });

  it('returns null when the API responds with an error status', async () => {
    const json = jest.fn();
    mockFetch(() => Promise.resolve({ ok: false, status: 503, json }));

    await expect(getNextMCUMovie()).resolves.toBeNull();
    expect(json).not.toHaveBeenCalled();
  });

  it('returns null when the request fails', async () => {
    mockFetch(() => Promise.reject(new Error('Network request failed')));

    await expect(getNextMCUMovie()).resolves.toBeNull();
  });
});

describe('getPlaceholderMovie', () => {
  it('returns demo data with a following production', async () => {
    const movie = await getPlaceholderMovie();

    expect(movie).not.toBeNull();
    expect(movie?.title).toEqual(expect.any(String));
    expect(movie?.following_production).toBeDefined();
  });
});
