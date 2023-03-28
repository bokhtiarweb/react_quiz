import { useState } from 'react';
import Card from './Card';
import useVideoList from './hooks/useVideoList';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function CardList() {
    const [page, setPage] = useState(1);
    const { loading, error, videos, hasMore } = useVideoList(page);

    return (
        <div>
            {videos.length > 0 && (
                <InfiniteScroll dataLength={videos.length} hasMore={hasMore} loader="loading..." next={() => setPage(page + 8)}>
                    {videos.map((video) =>
                        video.noq > 0 ? (
                            <Link
                                to={{
                                    pathname: `/quiz/${video.youtubeID}`,
                                    state: {
                                        videoTitleFromUrl: video.title
                                    }
                                }}
                                key={video.youtubeID}>
                                <Card title={video.title} id={video.youtubeID} noq={video.noq} />
                            </Link>
                        ) : (
                            <Card title={video.title} id={video.youtubeID} noq={video.noq} key={video.youtubeID} />
                        )
                    )}
                </InfiniteScroll>
            )}
            {!loading && videos.length === 0 && <div>No data found!</div>}
            {error && <div>There was an error !</div>}
            {loading && <div>Loading...</div>}
        </div>
    );
}
