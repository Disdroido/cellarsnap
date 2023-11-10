import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const babyVinoPlan = await prisma.plan.upsert({
    where: { name: 'Baby Vino' },
    update: {},
    create: {
      name: 'Baby Vino',
      features: ['50 Vino Bottles', '1 Cellar', '1 Cellar Members'],
      max_members: 1,
      ai_gen_max_pm: 7
    }
  });
  const VinoPlan = await prisma.plan.upsert({
    where: { name: 'Vino' },
    update: {},
    create: {
      name: 'Vino',
      features: ['100 Vino Bottles', '1 Cellar', '2 Cellar Members', 'SPECIAL_FEATURE'],
      max_members: 2,
      ai_gen_max_pm: 50,
      stripe_product_id: 'prod_OQkyHD9QCM0lHP'
    }
  });
  const VinoMaxPlan = await prisma.plan.upsert({
    where: { name: 'Vino Max' },
    update: {},
    create: {
      name: 'Vino Max',
      features: [
        'Unlimited Vino Bottles',
        '5 Cellars',
        '20 Cellar Members'
      ],
      max_members: 20,
      ai_gen_max_pm: 500,
      stripe_product_id: 'prod_OQkyv49OJpiSsR'
    }
  });

  console.log({ babyVinoPlan, VinoPlan, VinoMaxPlan });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
