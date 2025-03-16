// Function to format AI response
export const formatAIResponse = (responseText: string): JSX.Element => {
  // Split by sections (based on ### headers)
  const sections = responseText.split(/(?=###\s+[A-Za-z\s]+:)/);

  return (
    <div className="text-gray-800">
      {sections.map((section, index) => {
        // Extract section title if it exists
        const titleMatch = section.match(/^###\s+([A-Za-z\s]+):/);
        const title = titleMatch ? titleMatch[1] : null;

        // Remove title from content if it exists
        let content = title
          ? section.replace(/^###\s+[A-Za-z\s]+:/, "").trim()
          : section.trim();

        // Process content - convert numbered lists, bullet points, etc.
        const formattedContent = formatContent(content);

        return (
          <div key={index} className="mb-4">
            {title && <h3 className="font-medium text-lg mb-2">🚀 {title}</h3>}
            <div className="pl-1">{formattedContent}</div>
          </div>
        );
      })}
    </div>
  );
};

// Function to format content sections
const formatContent = (content: string): JSX.Element[] => {
  return content.split(/\n\s*\n/).map((paragraph, idx) => {
    if (/^\s*\d+\.\s/.test(paragraph)) {
      const points = paragraph.split(/(?=\s*\d+\.\s)/);
      return (
        <ol key={idx} className="list-decimal pl-5 space-y-2 my-2">
          {points.map((point, pointIdx) => {
            const cleanPoint = point.replace(/^\s*\d+\.\s/, "");
            return cleanPoint.trim() ? (
              <li key={pointIdx}>{cleanPoint}</li>
            ) : null;
          })}
        </ol>
      );
    } else if (/^\s*\*\s/.test(paragraph)) {
      const points = paragraph.split(/(?=\s*\*\s)/);
      return (
        <ul key={idx} className="list-disc pl-5 space-y-2 my-2">
          {points.map((point, pointIdx) => {
            const cleanPoint = point.replace(/^\s*\*\s/, "");
            return cleanPoint.trim() ? (
              <li key={pointIdx}>{cleanPoint}</li>
            ) : null;
          })}
        </ul>
      );
    } else {
      const formattedParagraph = paragraph
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/([A-Za-z\s]+):/g, "<strong>$1:</strong>");

      return (
        <p
          key={idx}
          className="my-2"
          dangerouslySetInnerHTML={{ __html: formattedParagraph }}
        />
      );
    }
  });
};
