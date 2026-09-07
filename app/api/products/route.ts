import { PrismaClient } from "../../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

// دریافت همه محصولات
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);

    return Response.json(
      { error: "خطا در دریافت محصولات" },
      { status: 500 }
    );
  }
}

// ایجاد محصول جدید
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const product = await prisma.product.create({
      data: {
        name: body.name,
        price: body.price,
        category: body.category,
        description: body.description,
        images: body.images,
        sizes: body.sizes,
        colors: body.colors,
        isFeatured: body.isFeatured ?? false,
        collections: body.collections,
        stock: body.stock ?? 0,
      },
    });

    return Response.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);

    return Response.json(
      { error: "خطا در ایجاد محصول" },
      { status: 500 }
    );
  }
}

// ویرایش محصول
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    if (!body.id) {
      return Response.json(
        { error: "شناسه محصول ارسال نشده است." },
        { status: 400 }
      );
    }

    const product = await prisma.product.update({
      where: {
        id: Number(body.id),
      },
      data: {
        name: body.name,
        price: body.price,
        category: body.category,
        description: body.description,
        images: body.images,
        sizes: body.sizes,
        colors: body.colors,
        isFeatured: body.isFeatured ?? false,
        collections: body.collections,
        stock: Number(body.stock ?? 0),
      },
    });

    return Response.json(product);
  } catch (error) {
    console.error("Error updating product:", error);

    return Response.json(
      { error: "خطا در ویرایش محصول" },
      { status: 500 }
    );
  }
}
// حذف محصول
export async function DELETE(request: Request) {
    try {
      const body = await request.json();
  
      if (!body.id) {
        return Response.json(
          { error: "شناسه محصول ارسال نشده است." },
          { status: 400 }
        );
      }
  
      await prisma.product.delete({
        where: {
          id: Number(body.id),
        },
      });
  
      return Response.json({
        message: "محصول با موفقیت حذف شد.",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
  
      return Response.json(
        { error: "خطا در حذف محصول" },
        { status: 500 }
      );
    }
  }