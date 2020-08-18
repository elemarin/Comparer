let metrics = [
    "TTIMeasurementEnd",
    "breakdown.css.bytes",
    "breakdown.js.bytes",
    "breakdown.image.bytes",
    "fullyLoaded",
    "domContentLoadedEventEnd",
    "domElements",
    "chromeUserTiming.LargestContentfulPaint",
    "render",
    "firstContentfulPaint",
    "TTFB",
    "loadTime",
    "chromeUserTiming.firstContentfulPaint",
    "chromeUserTiming.CumulativeLayoutShift",
]

export default function getMetrics(){
    return metrics;
}
