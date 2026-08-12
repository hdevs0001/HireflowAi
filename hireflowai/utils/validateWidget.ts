import { prisma } from "@/prisma";
import { ApiError } from "@/lib/error";

export default async function validateWidget(
  widgetId: string,
  origin: string | null,
) {
  if (!widgetId) {
    throw new ApiError(400, "Widget ID is required");
  }
  console.log("widgetId received:", widgetId);
  console.log(origin);
  const checkForWidget = await prisma.widget.findUnique({
    where: {
      widgetId: widgetId,
    },
    select: {
      isActive: true,
      allowedDomains: true,
      companyId: true,
    },
  });
  console.log("widget:", checkForWidget);
  if (!checkForWidget) {
    throw new ApiError(404, "Invalid widget");
  } else if (!checkForWidget.isActive) {
    throw new ApiError(403, "Widget is not active");
  } else if (!origin || !checkForWidget.allowedDomains.includes(origin)) {
    throw new ApiError(403, "Invaild Widget origin");
  }
  return checkForWidget;
}
